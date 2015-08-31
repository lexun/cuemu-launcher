require! \bootswatch/slate/bootstrap.css
require! \style.css

require! react: React
require! \./components/layout.ls : Layout


Layout
|> React.create-element
|> React.render _, document.get-element-by-id 'app-root'
