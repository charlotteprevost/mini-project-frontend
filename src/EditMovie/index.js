import React from 'react'
import { Modal, Form, Button, Label, Header, TransitionablePortal } from 'semantic-ui-react';


const EditMovie = (props) => {
  return (
    <TransitionablePortal open={props.open}  transition={{ animation:'scale', duration: 300 }}>
      <Modal open={props.open}>
        <Header>Edit Movie</Header>
         <Modal.Content>
          <Form onSubmit={props.closeAndEdit}>
            <Label>
              Edit Movie Title:
            </Label>
            <Form.Input type='text' name='title' value={props.movieToEdit.title} onChange={props.handleEditChange}/>
            <Label>
              Edit Movie Release Date:
            </Label>
            <Form.Input type='text' name='release_date' value={props.movieToEdit.release_date} onChange={props.handleEditChange}/>
            <Label>
              Edit Movie Synopsis:
            </Label>
            <Form.Input type='text' name='synopsis' value={props.movieToEdit.synopsis} onChange={props.handleEditChange}/>

            <Modal.Actions>
              <Button color='green' type='submit'>Edit Movie</Button>
            </Modal.Actions>
          </Form>
       </Modal.Content>
      </Modal>
    </TransitionablePortal>
    )
}

export default EditMovie;