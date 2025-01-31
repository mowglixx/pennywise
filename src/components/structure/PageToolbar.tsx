"use client"

// Global Imports
import { createContext, useContext, useState } from "react"

// Local Imports
import { ToolbarContext } from "../Contexts"

export const ToolbarFormDrawerControlsContext = createContext()

export const PageToolbar = (props) => {

  const { toolbarState, setToolbarState } = useContext(ToolbarContext)

  const FormRenderer = ({ formContext }) => {

    const CurrentForm = () => formContext?.forms?.[formContext.selectedAction]?.component || null
    return <CurrentForm />

  }

  return (<>
    <div>
      {
        props?.debugging &&
        (
          <>
            <div>
              Toolbar Debugging
            </div>
            <div>
              <pre title="Toolbar">
                {JSON.stringify(toolbarState, null, 2)}
              </pre>
            </div>
          </>)
      }

      <div>
        <button
          onClick={() => {
            setToolbarState({ ...toolbarState, selectedAction: "add" })
            // setDrawerForm(toolbarState.forms.add.component)
          }}>
          Add
        </button>
        <button
          onClick={() => {
            setToolbarState({ ...toolbarState, selectedAction: "edit" })
            // setDrawerForm(toolbarState.forms.edit.component)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          Edit
        </button>
        <button
          onClick={() => {
            setToolbarState({ ...toolbarState, selectedAction: "delete" })
            // setDrawerForm(toolbarState.forms.delete.component)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          Delete
        </button>
      </div>

      <div>
        <FormRenderer formContext={toolbarState} />
      </div>
    </div>
  </>)
}
