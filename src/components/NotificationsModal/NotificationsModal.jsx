import React from 'react'
import { Modal } from 'antd'
import { BellOutlined } from '@ant-design/icons'

const NotificationsModal = ({ visible, setVisible, notifications = [] }) => {
  return (
    <div>
      <BellOutlined
        className='header__icon'
        onClick={() => setVisible(true)}
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
