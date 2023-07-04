import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadInput from "./UploadInput";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks";
import { nanoid } from "nanoid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type UploadFormProps = {
  closeModal: () => void;
};

type FormData = {
  author: string;
  title: string;
  image: FileList;
  song: FileList;
};

const UploadForm: FC<UploadFormProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<FormData>();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const { refresh } = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    // TODO: add validation
    try {
      const imageFile = values.image.item(0);
      const songFile = values.song.item(0);

      if (!imageFile || !songFile || !user) {
        toast.error("Missing image/song!");
      }
      const uniqueID = nanoid();

      // Upload song to storage
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile as File, {
          cacheControl: "3600",
          upsert: false
        });

      if (songError) {
        return toast.error("Failed song upload. Try again.");
      }

      // Upload image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile as File, {
            cacheControl: "3600",
            upsert: false
          });

      if (songError) {
        return toast.error("Failed image upload. Try again.");
      }

      // Insert into DB
      const { error: insertError } = await supabaseClient.from("songs").insert({
        user_id: user?.id,
        title: values.title,
        author: values.author,
        image_path: imageData?.path,
        song_path: songData?.path
      });

      if (insertError) {
        return toast.error("Failed to insert row in DB.");
      }

      refresh();
      toast.success(
        `Successfully uploaded song: ${values.title} by ${values.author}!`
      );
      reset();
      closeModal();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UploadInput
        id="title"
        disabled={isSubmitting}
        placeholder="Title"
        {...register("title", { required: true, minLength: 2 })}
      />
      <UploadInput
        id="author"
        disabled={isSubmitting}
        placeholder="Author"
        {...register("author", { required: true, minLength: 2 })}
      />
      <aside>
        <p>Select a file</p>
        <UploadInput
          id="song"
          type="file"
          disabled={isSubmitting}
          accept=".mp3"
          {...register("song", { required: true })}
        />
      </aside>
      <aside>
        <p>Select an image</p>
        <UploadInput
          id="image"
          type="file"
          disabled={isSubmitting}
          accept="image/*"
          {...register("image", { required: true })}
        />
      </aside>
      <Button className="w-full mt-1" disabled={isSubmitting} type="submit">
        Upload song!
      </Button>
    </form>
  );
};

export default UploadForm;
