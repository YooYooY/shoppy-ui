export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0])
    } else {
      return formatErrorMessage(response.message)
    }
  }

  return 'Unknow error occured.'
}

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1)
}
