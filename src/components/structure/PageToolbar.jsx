"use client"

import { useContext, useState } from "react"
import { ToolbarContext } from "../Contexts"
import { Accordion, AccordionDetails, AccordionSummary, Divider, Drawer, Grid, IconButton, Modal, Paper, Toolbar } from "@mui/material"
import { Add, Edit, Delete, ExpandMore } from "@mui/icons-material"

const PageToolbar = (props) => {
  const { toolbarState } = useContext(ToolbarContext)
  const [open, setOpen] = useState(false)
  const [DrawerForm, setDrawerForm] = useState(<></>)

  const toggleDrawer = () => setOpen(!open)

  return (

    <Paper>
      {
        props?.debugging &&
        (<Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}>
            Toolbar Debugging
          </AccordionSummary>
          <AccordionDetails>
            <pre title="Toolbar">
              {JSON.stringify(toolbarState, null, 2)}
            </pre>
          </AccordionDetails>
        </Accordion>)
      }


      <Toolbar>
        <IconButton onClick={() => {
          setDrawerForm(toolbarState.forms.add)
          setOpen(true)
        }}>
          <Add />
        </IconButton>
        <IconButton
          onClick={() => {
            setDrawerForm(toolbarState.forms.edit)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedId === null ? true : false}>
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            setDrawerForm(toolbarState.forms.delete)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedId === null ? true : false}>
          <Delete />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer} sx={'50vw'}>
        <Grid>

          {props?.debugging && <Accordion>
            <AccordionSummary>
              Toolbar Debugging
            </AccordionSummary>
            <AccordionDetails>
              <pre title="Toolbar">
                {JSON.stringify(toolbarState, null, 2)}
              </pre>
            </AccordionDetails>
          </Accordion>}

          <Grid item>
            {DrawerForm}
          </Grid>

        </Grid>
      </Drawer>
    </Paper>

  )
}
export default PageToolbar