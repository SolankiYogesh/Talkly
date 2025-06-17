import {useEffect, useRef} from 'react'

export type ChatEventType = 'chat' | 'typing' | 'user_list'
export type ChatSocketPayload = {
  type: ChatEventType | 'read'
  data?: any
}

type ChatCallback = (event: {type: ChatEventType; data: any}) => void

export function useChatSocket(userId: string, callback: ChatCallback) {
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({type: 'init', userId}))
    }

    ws.onmessage = (event) => {
      try {
        const payload: ChatSocketPayload = JSON.parse(event.data)

        if (payload.type === 'read') {
          return
        }

        if (['chat', 'typing', 'user_list'].includes(payload.type)) {
          callback({type: payload.type as ChatEventType, data: payload.data})
        }
      } catch (err) {
        console.error('Invalid WebSocket message', err)
      }
    }

    ws.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    return () => {
      ws.close()
    }
  }, [userId, callback])
}
