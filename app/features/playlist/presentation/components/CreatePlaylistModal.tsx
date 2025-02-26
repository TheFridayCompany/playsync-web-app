import { useFormik } from "formik";
import * as Yup from "yup";
import { PlaylistVisibility } from "../../domain/entities/playlist.entity";
import CreatePlaylistDto from "../../domain/dto/create-playlist.dto";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreatePlaylistDto) => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Playlist name must be at least 3 characters")
    .max(20, "Playlist name must be at most 20 characters")
    .required("Playlist name is required"),
  description: Yup.string()
    .min(6, "Description must be at least 6 characters")
    .max(100, "Description must be at most 100 characters")
    .optional(),
  visibility: Yup.mixed<PlaylistVisibility>()
    .oneOf(
      [PlaylistVisibility.PUBLIC, PlaylistVisibility.PRIVATE],
      "Invalid visibility option"
    )
    .required("Visibility is required"),
});

export default function CreatePlaylistModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlaylistModalProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      visibility: PlaylistVisibility.PUBLIC,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Creating playlist:", values);
      onSubmit(values);
      onClose(); // Close the modal after creating the playlist
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Create Playlist</h2>

        {/* Playlist Name Input */}
        <input
          type="text"
          placeholder="Playlist Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}

        {/* Playlist Description Input */}
        <textarea
          placeholder="Description (optional)"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="description"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        ) : null}

        {/* Visibility Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="visibility"
            className="block text-sm font-medium text-gray-700"
          >
            Visibility
          </label>
          <select
            id="visibility"
            value={formik.values.visibility}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="visibility"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value={PlaylistVisibility.PUBLIC}>Public</option>
            <option value={PlaylistVisibility.PRIVATE}>Private</option>
          </select>
          {formik.touched.visibility && formik.errors.visibility ? (
            <div className="text-red-500 text-sm">
              {formik.errors.visibility}
            </div>
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => formik.handleSubmit()}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Playlist
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
