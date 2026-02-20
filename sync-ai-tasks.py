#!/usr/bin/env python3
"""
AI Team Task Synchronization Script
Syncs AI team member tasks to the Convex task control center
"""

import json
import os
import sys
from datetime import datetime, timezone
import requests

# Convex function endpoint (will be configured with actual URL)
CONVEX_TASK_CREATE_URL = os.getenv('CONVEX_TASK_CREATE_URL', '')
CONVEX_AUTH_TOKEN = os.getenv('CONVEX_AUTH_TOKEN', '')

class AITaskSync:
    def __init__(self):
        self.tasks = []
        
    def add_task(self, title, description, assigned_to, category, priority="medium", status="in_progress"):
        """Add a task for AI team member"""
        task = {
            "title": title,
            "description": description,
            "assignedTo": assigned_to,
            "category": category,
            "priority": priority,
            "status": status,
            "createdBy": "AI Assistant",
            "tags": ["AI", category]
        }
        self.tasks.append(task)
        return task
        
    def sync_to_convex(self):
        """Sync all tasks to Convex database"""
        if not CONVEX_TASK_CREATE_URL or not CONVEX_AUTH_TOKEN:
            print("Warning: Convex configuration not set, skipping sync")
            return False
            
        success_count = 0
        for task in self.tasks:
            try:
                headers = {
                    'Authorization': f'Bearer {CONVEX_AUTH_TOKEN}',
                    'Content-Type': 'application/json'
                }
                response = requests.post(
                    CONVEX_TASK_CREATE_URL,
                    json=task,
                    headers=headers,
                    timeout=30
                )
                if response.status_code == 200:
                    success_count += 1
                    print(f"✅ Synced task: {task['title']}")
                else:
                    print(f"❌ Failed to sync task: {task['title']} - {response.text}")
            except Exception as e:
                print(f"❌ Error syncing task: {task['title']} - {str(e)}")
                
        print(f"📊 Sync completed: {success_count}/{len(self.tasks)} tasks synced")
        return success_count == len(self.tasks)

def main():
    """Main function to sync current AI team tasks"""
    sync = AITaskSync()
    
    # Add current active tasks from AI team
    current_tasks = [
        {
            "title": "家纺知识图谱构建与维护",
            "description": "持续完善家纺行业知识图谱，包括产品分类、生产工艺、供应链流程等核心实体和关系",
            "assigned_to": "织梦",
            "category": "知识管理",
            "priority": "high"
        },
        {
            "title": "销售预测模型开发与优化",
            "description": "基于历史销售数据开发多模型集成的销售预测系统，支持不同产品类型的精准预测",
            "assigned_to": "预见", 
            "category": "数据分析",
            "priority": "high"
        },
        {
            "title": "ETL数据管道维护与优化",
            "description": "维护和优化从管家婆报表到MySQL数据库的ETL流程，确保数据质量和处理效率",
            "assigned_to": "数流",
            "category": "数据工程",
            "priority": "medium"
        },
        {
            "title": "消费者行为分析研究",
            "description": "分析消费者购买行为和市场趋势，为产品开发和营销策略提供洞察",
            "assigned_to": "消费洞察",
            "category": "市场研究",
            "priority": "medium"
        },
        {
            "title": "自动化补货系统监控",
            "description": "监控自动化补货系统的运行状态，准备3月1日恢复定时任务",
            "assigned_to": "补货智控",
            "category": "自动化",
            "priority": "low"
        },
        {
            "title": "中文搜索引擎集成维护",
            "description": "维护和扩展中文搜索引擎集成，包括百度搜索、微信搜一搜、知乎搜索等",
            "assigned_to": "李小明",
            "category": "系统开发",
            "priority": "medium"
        }
    ]
    
    for task_data in current_tasks:
        sync.add_task(**task_data)
    
    # Sync to Convex
    sync.sync_to_convex()

if __name__ == "__main__":
    main()