'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState, useEffect } from 'react';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TeamMember } from './components/TeamMember';

export default function TaskControlCenter() {
  const tasks = useQuery(api.tasks.getAllTasks);
  const teamMembers = useQuery(api.team.getAllTeamMembers);
  const createTask = useMutation(api.tasks.createTask);
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus);

  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Initialize team members
  useEffect(() => {
    if (teamMembers && teamMembers.length === 0) {
      // Initialize AI team members
      const aiTeam = [
        { name: '李小明', role: '主理人/协调者', avatar: '👤' },
        { name: '织梦', role: '家纺知识专家', avatar: '🧵' },
        { name: '预见', role: '销售预测分析师', avatar: '📈' },
        { name: '数流', role: 'ETL数据工程师', avatar: '📊' },
        { name: '消费洞察', role: '消费者行为分析师', avatar: '👥' },
        { name: '补货智控', role: '自动化补货系统', avatar: '🔄' }
      ];
      // This would be handled by the backend in a real app
    }
  }, [teamMembers]);

  if (!tasks || !teamMembers) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === activeTab);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    blocked: tasks.filter(t => t.status === 'blocked').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">任务控制中心</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              新建任务
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">总任务</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">已完成</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">进行中</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
              <div className="text-sm text-gray-600">待办</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
              <div className="text-sm text-gray-600">阻塞</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', name: '全部任务', count: stats.total },
              { id: 'todo', name: '待办', count: stats.todo },
              { id: 'in_progress', name: '进行中', count: stats.inProgress },
              { id: 'completed', name: '已完成', count: stats.completed },
              { id: 'blocked', name: '阻塞', count: stats.blocked }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                <span className="ml-2 bg-gray-100 text-gray-900 rounded-full py-0.5 px-2 text-xs font-medium">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdateStatus={updateTaskStatus} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无任务</h3>
            <p className="text-gray-500">点击"新建任务"按钮开始添加任务</p>
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">新建任务</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <TaskForm 
                onSubmit={(taskData) => {
                  createTask(taskData);
                  setShowForm(false);
                }} 
                onCancel={() => setShowForm(false)}
                teamMembers={teamMembers}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}