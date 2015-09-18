require! react: React
require! reactionary: { div, h1 }
require! './header.ls': Header
require! './config.ls': Config
present = React.create-element


class Layout extends React.Component

  render: ->
    div {},
      present Header
      div class-name: \container,
        div class-name: \row,
          div class-name: \col-md-12,
            present Config


module.exports = Layout
