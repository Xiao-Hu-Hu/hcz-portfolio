import { Github, Mail, MapPin, Phone, School, UserRound } from 'lucide-react';
import type { ProfileData } from '../lib/types';

export const profile: ProfileData = {
  name: '胡传政',
  role: 'Go 后端工程师 / AI 应用开发',
  intent: '意向：后端实习生',
  availability: '一周内到岗，可实习半年及以上',
  education: {
    school: '西南石油大学',
    degree: '本科',
    major: '软件工程',
    period: '2024.09 - 2028.07',
    label: '双一流',
  },
  contacts: [
    {
      label: '电话',
      value: '18437309985',
      href: 'tel:18437309985',
      icon: Phone,
    },
    {
      label: '邮箱',
      value: '3624435880@qq.com',
      href: 'mailto:3624435880@qq.com',
      icon: Mail,
    },
    {
      label: '身份',
      value: '男 / 后端实习生',
      href: '#profile',
      icon: UserRound,
    },
    {
      label: '学校',
      value: '西南石油大学',
      href: '#profile',
      icon: School,
    },
    {
      label: '方向',
      value: 'Go + AI 工程化',
      href: '#skills',
      icon: Github,
    },
    {
      label: '位置',
      value: '中国',
      href: '#contact',
      icon: MapPin,
    },
  ],
  headlineTags: ['Gin', 'Gorm', 'MySQL', 'Redis', 'RabbitMQ', 'Eino', 'RAG', 'SSE', 'Docker'],
  skillGroups: [
    {
      title: 'Go 工程能力',
      summary: '并发、底层原理、工程化组织',
      accent: 'cyan',
      items: ['Goroutine', 'Channel', 'Context', '接口', '反射', '错误处理', 'GMP', 'GC', '逃逸分析'],
    },
    {
      title: 'Web 后端',
      summary: '从 API 到数据访问的业务闭环',
      accent: 'lime',
      items: ['Gin', 'Gorm', 'RESTful API', '中间件', '参数校验', 'Controller / Service / DAO', 'JWT'],
    },
    {
      title: '数据与基础设施',
      summary: '事务、缓存、消息、部署',
      accent: 'amber',
      items: ['MySQL', '索引', '事务', 'Redis', 'RabbitMQ', 'Docker', 'Linux', 'Go Modules', 'Git'],
    },
    {
      title: 'AI 应用开发',
      summary: '让模型能力进入真实业务链路',
      accent: 'rose',
      items: ['Eino', 'LLM', 'Tool Calling', 'Retriever', 'RAG', 'PGVector', 'ONNX Runtime', 'MobileNetV2', 'SSE'],
    },
  ],
  projects: [
    {
      name: '基于 Go 的电商系统（含 AI 智能客服）',
      period: '2025.09 - 2025.12',
      stack: ['Gin', 'Gorm', 'MySQL', 'Redis', 'Docker', 'Eino', 'LLM', 'PGVector'],
      description:
        '负责设计并开发基于 Go 的电商后端系统，覆盖商品、购物车、订单、用户中心等核心交易链路，并建设 AI 智能客服模块，实现商品问答、辅助推荐、多轮会话与知识检索增强能力。',
      tags: ['Agent Service', 'Tool Calling', 'RAG', '交易链路解耦'],
      github: 'https://github.com/Xiao-Hu-Hu/gin_mall_tmp',
      metrics: [
        { label: '业务模块', value: '4+', detail: '商品、购物车、订单、用户中心核心链路' },
        { label: 'AI 编排', value: 'Tool + Retriever', detail: 'ChatModel、商城 Tool 与知识检索组合编排' },
        { label: '会话状态', value: 'Redis', detail: '多轮对话上下文存储、拼装与状态延续' },
      ],
      highlights: [
        '基于 API / Service / DAO / Model 分层模式拆分商品、订单、用户、购物车等核心模块，统一业务边界与数据访问逻辑。',
        '构建 AI Agent Service 独立服务层，基于 Eino 将 ChatModel、Tool、Retriever 组合编排，避免 LLM 直接侵入交易核心链路。',
        '实现面向商城场景的 Tool Calling 机制，通过 AI 调用商品查询、订单创建等既有 API / Service 完成业务闭环。',
        '引入 Redis 会话上下文管理与 RAG 检索增强方案，提升连续对话、规则解释和售后咨询场景下的准确率与一致性。',
        '对下单等高风险动作增加二次确认、参数校验与权限校验，复用原订单服务保障库存、金额、地址归属等关键校验逻辑。',
      ],
    },
    {
      name: 'AI 智能交互服务平台',
      period: '2026.02 - 2026.04',
      stack: ['Gin', 'Gorm', 'Redis', 'MySQL', 'JWT', 'RabbitMQ', 'Eino', 'ONNX Runtime', 'SSE', 'Docker'],
      description:
        '基于 Gin 框架开发智能交互服务平台，采用前后端分离架构，后端负责用户认证、AI 聊天、图像识别等核心能力，并支持 Docker Compose 容器化部署。',
      tags: ['SSE 流式响应', '异步持久化', '图像识别', '认证体系'],
      metrics: [
        { label: '核心模块', value: '用户 / 会话 / 消息 / 视觉', detail: '覆盖认证、AI 聊天、消息持久化和图像识别' },
        { label: '流式交互', value: 'SSE', detail: '实时推送模型生成内容，改善聊天反馈体验' },
        { label: '异步链路', value: 'RabbitMQ', detail: '消息异步写入与后台消费，降低主流程阻塞' },
      ],
      highlights: [
        '基于 Gin + Controller + Service + DAO 分层设计封装用户、会话、消息、图像识别等核心模块，降低业务耦合度。',
        '实现邮箱验证码注册、JWT 登录认证和中间件拦截机制，支持 Bearer Token 鉴权与用户信息上下文注入。',
        '搭建 AI 聊天服务，支持多轮对话、会话管理与 SSE 流式响应，能够实时向前端推送模型生成内容。',
        '引入 RabbitMQ 实现消息异步写入与后台消费，承担系统解耦、削峰和异步持久化职责。',
        '集成 Redis 实现验证码缓存、临时状态存储与热点数据快速读写；基于 ONNX Runtime + MobileNetV2 支持图片上传、推理执行与分类结果返回。',
      ],
    },
  ],
  strengths: [
    '学习能力强，对新技术保持高敏感度，能把理论快速落到项目实践。',
    '担任学生科技团队队长，具备沟通协作和推动技术讨论落地的经验。',
    '熟练使用 Cursor、Trae、Codex 等 AI 编程工具辅助开发，重视工程效率与代码质量。',
  ],
};
