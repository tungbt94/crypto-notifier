import notifier from 'node-notifier'

const notify = async (title="title", message="message") => {
  notifier.notify({
    title: title,
    message: message,
    sound: true
  })
}

module.exports.notify = notify;