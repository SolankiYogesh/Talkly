import type {WebSocket} from 'ws'
import {WebSocketServer} from 'ws'

import {supabase} from '../supabase'
import type {ChatMessage, SocketPayload} from '../types'

const clients = new Map<string, WebSocket>() // userId => ws

export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({server})

  const broadcastUserList = async () => {
    const {data: users} = await supabase.from('users').select('id, username')
    for (const client of clients.values()) {
      client.send(JSON.stringify({type: 'user_list', data: users}))
    }
  }

  wss.on('connection', (ws: WebSocket) => {
    let userId: string | undefined

    ws.on('message', async (data) => {
      const message: SocketPayload = JSON.parse(data.toString())

      switch (message.type) {
        case 'init':
          // eslint-disable-next-line prefer-destructuring
          userId = message.userId
          broadcastUserList()
          break

        case 'chat':
          const chat: ChatMessage = message.data
          await supabase.from('messages').insert([chat])
          const target = clients.get(chat.receiver_id)
          target?.send(JSON.stringify({type: 'chat', data: chat}))
          break

        case 'typing':
          const typingEvent = message.data
          const targetTyping = clients.get(typingEvent.receiver_id)
          targetTyping?.send(JSON.stringify({type: 'typing', data: typingEvent}))
          break

        case 'read':
          await supabase
            .from('messages')
            .update({read: true})
            .eq('sender_id', message.data.sender_id)
            .eq('receiver_id', message.data.receiver_id)
          const sender = clients.get(message.data.sender_id)
          sender?.send(JSON.stringify({type: 'read', data: message.data}))
          break
        case 'user_list': // do nothing
      }
    })

    ws.on('close', () => {
      if (userId) {
        clients.delete(userId)
        broadcastUserList()
      }
    })
  })
}
