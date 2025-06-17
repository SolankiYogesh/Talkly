export type ChatMessage = {
  sender_id: string
  receiver_id: string
  content: string
  timestamp: string
  read: boolean
}

export type SocketPayload = {
  type: 'init' | 'chat' | 'typing' | 'read' | 'user_list'
  userId?: string
  data?: any
}
