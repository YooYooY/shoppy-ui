'use client'

import { Box, Modal, Button, Stack, TextField } from '@mui/material'
import { FormResponse } from '@/app/common/interfaces/form-response.interface'
import { useState } from 'react'
import createProduct from '../actions/create-product'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface CreateProductModalProps {
  open: boolean
  handleCloseAction: () => void
}

export default function CreateProductModal({ open, handleCloseAction }: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>()

  const onClose = () => {
    setResponse(undefined)
    handleCloseAction()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            const response = await createProduct(formData)
            setResponse(response)
            if (!response.error) {
              onClose()
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
