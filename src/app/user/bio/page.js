export default function Page() {
  return (
    <div className="bg-orange-300 ml-3 p-5 w-full">
      <h1 className="text-xl font-bold">Profile</h1>
      <div className="flex">
        <div className="photo justify-center mt-5">
          <img
            src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
            alt="alt"
            className="rounded-full w-36 h-36 mr-5"
          />
          <button className="mt-3 inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-orange-600 rounded-lg h-[60px]">
            Edit Profile
          </button>
        </div>
        <div className="detail-profile  mx-12 flex">
          <div className="field">
            <p className="mb-2">Name</p>
            <p className="mb-2">Age</p>
            <p className="mb-2">Gender</p>
            <p className="mb-2">Address</p>
            <p className="mb-2">Phone Number</p>
            <p className="mb-2">Email</p>
            <p className="mb-2">Affiliate Code</p>
          </div>
          <div className="field-detail ml-8">
            <p className="mb-2">Arief</p>
            <p className="mb-2">22</p>
            <p className="mb-2">Male</p>
            <p className="mb-2">Address</p>
            <p className="mb-2">Phone Number</p>
            <p className="mb-2">email@gmail.com</p>
            <p className="mb-2">KLS798</p>
          </div>
        </div>
      </div>
    </div>
  );
}
