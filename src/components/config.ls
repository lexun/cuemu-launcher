require! react: React
require! reactionary: { button, div, form, input, label }


class Config extends React.Component

  component-did-mount: ->
    React.find-DOM-node(this)
      .elements[\install-location]
      .webkitdirectory = true

  render: ->
    form {},
      div class-name: \form-group,
        label htmlFor: \install-location, 'Install Location'
        input id: \install-location, type: \file


module.exports = Config
