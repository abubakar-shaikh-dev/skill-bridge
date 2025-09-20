import jobRoles from "../data/jobRoles.json";

export default function SuggestedJobs() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Suggested Jobs
          </h2>
          <p className="text-lg text-gray-600">
            Explore career opportunities that match your skills and interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobRoles.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {job.label}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {job.value}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
