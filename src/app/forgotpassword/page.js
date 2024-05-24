export default function Page() {
    return (
      <div className="main-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password?
            </h2>        
          </div>
  
          <form className="space-y-8">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="Email"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                  text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                />
              </div>
                            
            </div>            
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input type="checkbox" className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md"/>
                <label htmlFor="" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
              </div>
            </div>
            <div>
            <button className="w-full flex justify-center items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-md">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  