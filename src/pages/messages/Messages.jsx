import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

const mockConversations = [
  {
    _id: '1',
    client: { nom: 'Mohamed Diallo', telephone: '+221 77 123 45 67' },
    dernierMessage: 'Bonjour, je suis intéressé par la Toyota Corolla',
    messagesNonLus: 2,
    dernierMessageDate: '2024-12-24T10:30:00',
  },
  {
    _id: '2',
    client: { nom: 'Fatou Sow', telephone: '+221 76 987 65 43' },
    dernierMessage: 'Merci pour votre réponse',
    messagesNonLus: 0,
    dernierMessageDate: '2024-12-23T15:20:00',
  },
]

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageText, setMessageText] = useState('')

  const messages = [
    {
      _id: '1',
      expediteur: 'client',
      message: 'Bonjour, je suis intéressé par la Toyota Corolla 2024',
      dateEnvoi: '2024-12-24T10:30:00',
    },
    {
      _id: '2',
      expediteur: 'admin',
      message: 'Bonjour! Merci pour votre intérêt. Le véhicule est disponible.',
      dateEnvoi: '2024-12-24T10:32:00',
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

      <div className="card p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
          <div className="border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockConversations.map((conv) => (
                <button
                  key={conv._id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedConversation._id === conv._id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{conv.client.nom}</p>
                    {conv.messagesNonLus > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                        {conv.messagesNonLus}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conv.dernierMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(conv.dernierMessageDate).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{selectedConversation.client.nom}</h3>
              <p className="text-sm text-gray-500">{selectedConversation.client.telephone}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.expediteur === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.expediteur === 'admin'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.expediteur === 'admin' ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.dateEnvoi).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="input flex-1"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="btn-primary btn-md">
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
