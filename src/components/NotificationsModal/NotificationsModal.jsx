import React from 'react'
import { Modal } from 'antd' // Usamos Ant Design para los modales
import { BellOutlined } from '@ant-design/icons'

const NotificationsModal = ({ visible, setVisible, notifications = [] }) => {
  // Establecer valor predeterminado
  return (
    <div>
      <BellOutlined
        className='header__icon'
        onClick={() => setVisible(true)} // Controlamos el estado del modal al hacer clic en la campana
        aria-label='Notifications'
      />

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
