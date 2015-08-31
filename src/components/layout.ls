require! react: React
require! reactionary: { div, h1 }


class Layout extends React.Component
  render: ->
    div class-name: \container,
      div class-name: \row,
        div class-name: \col-md-12,
          h1 \CUEmu


module.exports = Layout
