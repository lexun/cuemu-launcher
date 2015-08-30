require! react: React


class Layout extends React.Component
  render: ->
    React.DOM.h1 {}, @props.name


module.exports = Layout
