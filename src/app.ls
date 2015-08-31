require! react: React
require! \bootswatch/slate/bootstrap.css
require! \./components/layout.ls : Layout


Layout
|> React.create-element _, name: \World
|> React.render _, document.get-element-by-id 'app-root'
