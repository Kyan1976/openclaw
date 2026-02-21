import { useState } from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignedTo: string;
  createdBy: string;
  dueDate?: number;
  notes?: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  progress: number;
}

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (args: { taskId: string; status: 'todo' | 'in_progress' | 'completed' | 'blocked'; progress?: number }) => void;
}

export function TaskCard({ task, onUpdateStatus }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };
  
  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    blocked: 'bg-red-100 text-red-800'
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN');
  };
  
  const formatDueDate = (dueDate?: number) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `已过期 ${Math.abs(diffDays)} 天`;
    } else if (diffDays === 0) {
      return '今天到期';
    } else if (diffDays <= 3) {
      return `即将到期 (${diffDays} 天)`;
    } else {
      return `${formatDate(dueDate)}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
            {task.priority === 'low' && '低'}
            {task.priority === 'medium' && '中'}
            {task.priority === 'high' && '高'}
            {task.priority === 'critical' && '紧急'}
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
            {task.status === 'todo' && '待办'}
            {task.status === 'in_progress' && '进行中'}
            {task.status === 'completed' && '已完成'}
            {task.status === 'blocked' && '阻塞'}
          </span>
          
          {task.dueDate && (
            <span className={`text-xs ${
              task.dueDate < Date.now() ? 'text-red-600' : 'text-gray-500'
            }`}>
              {formatDueDate(task.dueDate)}
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>分配给: {task.assignedTo}</span>
          <span>创建: {formatDate(task.createdAt)}</span>
        </div>
        
        {task.progress > 0 && task.progress < 100 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>进度</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {showDetails ? '收起详情' : '查看详情'}
          </button>
          
          {task.status !== 'completed' && (
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus({
                taskId: task._id,
                status: e.target.value as any,
                progress: e.target.value === 'completed' ? 100 : task.progress
              })}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="todo">待办</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="blocked">阻塞</option>
            </select>
          )}
        </div>
      </div>
      
      {showDetails && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-700">分类:</span>
              <span className="ml-2 text-gray-600">{task.category}</span>
            </div>
            
            {task.notes && (
              <div>
                <span className="font-medium text-gray-700">备注:</span>
                <p className="ml-2 text-gray-600 text-sm mt-1">{task.notes}</p>
              </div>
            )}
            
            {task.tags.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">标签:</span>
                <div className="ml-2 flex flex-wrap gap-1 mt-1">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              最后更新: {formatDate(task.updatedAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}