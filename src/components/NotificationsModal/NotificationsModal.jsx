import React, { useState } from 'react'
import { Modal, Button } from 'antd' // Usamos Ant Design para los modales y botones

const NotificationsModal = () => {
  const [visible, setVisible] = useState(false)

  // Simulamos algunas notificaciones como ejemplo
  const notifications = [
    { message: 'Tu objetivo de ahorro "Viaje a Europa" está en buen camino.' },
    { message: 'Recuerda actualizar tus gastos mensuales.' },
    { message: 'Has alcanzado el 50% de tu objetivo "Comprar una Laptop".' },
  ]

  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>
        Ver Notificaciones
      </Button>

      <Modal
        title='Notificaciones'
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <p>No tienes notificaciones.</p>
        )}
      </Modal>
    </div>
  )
}

export default NotificationsModal
