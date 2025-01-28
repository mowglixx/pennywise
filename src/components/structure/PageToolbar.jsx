"use client"

// Global Imports
import { createContext, useContext, useState } from "react"

// Local Imports
import { ToolbarContext } from "../Contexts"

export const ToolbarFormDrawerControlsContext = createContext()

export const PageToolbar = (props) => {
  const { toolbarState } = useContext(ToolbarContext)
  const [open, setOpen] = useState(false)
  const [DrawerForm, setDrawerForm] = useState(<></>)

  const toggleDrawer = () => setOpen(!open)

  return (

    <>
      {
        props?.debugging &&
        (<div>
          <div>
            Toolbar Debugging
          </div>
          <div>
            <pre title="Toolbar">
              {JSON.stringify(toolbarState, null, 2)}
            </pre>
          </div>
        </div>)
      }


      <div>
        <button onClick={() => {
          setDrawerForm(toolbarState.forms.add)
          setOpen(true)
        }}>
          Add
        </button>
        <button
          onClick={() => {
            setDrawerForm(toolbarState.forms.edit)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          Edit
        </button>
        <button
          onClick={() => {
            setDrawerForm(toolbarState.forms.delete)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          Delete
        </button>
      </div>

      <div anchor="right" open={open} onClose={toggleDrawer} sx={'50vw'}>
        <div>

        <div>
        <div>
          <button onClick={() => {setOpen(false)}}>
            Close
          </button>
        </div>
        </div>
        <div>
          {props?.debugging && <div>
            <div>
              Toolbar Debugging
            </div>
            <div>
              <pre title="Toolbar">
                {JSON.stringify(toolbarState, null, 2)}
              </pre>
            </div>
          </div>}
        </div>

          <div>
          </div>
        </div>
      </div>
    </>

  )
}
