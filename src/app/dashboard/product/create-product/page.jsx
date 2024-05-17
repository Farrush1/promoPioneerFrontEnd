import { FaFileUpload } from "react-icons/fa";

export default function CreateProduct() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form className="space-y-6">
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Product Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Choose Category
                </option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
                <option>Category 4</option>
                <option>Category 5</option>
              </select>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="text"
                placeholder="Rp."
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              ></textarea>
            </label>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <span>Upload File</span>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaFileUpload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Warehouse Name</span>
              </div>
              <input
                type="text"
                placeholder="Warehouse Name"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Location</span>
              </div>
              <input
                type="text"
                placeholder="Warehouse Location"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">City</span>
              </div>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Warehouse City
                </option>
                <option>City 1</option>
                <option>City 2</option>
                <option>City 3</option>
                <option>City 4</option>
                <option>City 5</option>
              </select>
            </label>
          </div>
        </div>
      </form>

      <button className="btn btn-primary mt-6 bg-orange-600">Add Product</button>
    </div>
  );
}
