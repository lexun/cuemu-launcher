require! react: React
require! reactionary: { h1 }


class Layout extends React.Component
  render: ->
    h1 'Hello ' + @props.name


module.exports = Layout
