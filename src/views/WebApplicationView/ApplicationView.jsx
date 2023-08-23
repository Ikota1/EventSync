import Sidebar from '../../components/Sidebar/Sidebar';

const ApplicationView = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold text-white">Application View</h1>
      </div>
    </div>
  )
}

export default ApplicationView;