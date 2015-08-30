require! react: React
require! './components/layout.ls': Layout


Layout
|> React.create-element _, name: \World
|> React.render _, document.get-element-by-id 'app-root'
