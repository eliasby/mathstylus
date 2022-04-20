/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useState } from 'react'
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from '@chakra-ui/react'
import { Expression } from './expression'
import { useCallback } from 'react'

type ViewerProps = {
  expression: Expression
  open: boolean
  onClose?: () => void
}

const Viewer = ({ expression, open, onClose }: ViewerProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleDelete = useCallback(() => {
    expression.removeSelf()
    onClose?.()
  }, [expression])

  useEffect(() => {
    setModalOpen(open)
  }, [open])

  return (
    <Modal isOpen={modalOpen} onClose={() => onClose?.()} size="xl" isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Expression</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{expression.ui({ interactions: false })}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={2} onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={() => onClose?.()}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Viewer
