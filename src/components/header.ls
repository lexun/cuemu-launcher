require! react: React
require! reactionary: { button, div }
require! ipc


styles =

  main:
    margin-bottom: 60px

  brand:
    min-height: 100px
    background: 'no-repeat url("logo.png")'
    background-size: 215px

  button:
    margin: '20px 30px 0 0'


class Header extends React.Component

  render: ->
    div style: styles.main,
      div style: styles.brand,
      @close-button!

  close-button: ->
    attributes =
      class-name: 'label label-danger pull-right'
      on-click: -> ipc.send 'close'
      style: styles.button
    button attributes, 'close'


module.exports = Header
