export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600">页面未找到</p>
        <a href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          返回首页
        </a>
      </div>
    </div>
  );
}