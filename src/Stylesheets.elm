port module Stylesheets exposing (..)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.File exposing (CssFileStructure, CssCompilerProgram)
import Css.Namespace exposing (namespace)


port files : CssFileStructure -> Cmd msg


main : CssCompilerProgram
main =
    Css.File.compiler files fileStructure


fileStructure : CssFileStructure
fileStructure =
    Css.File.toFileStructure
        [ ( "main.css"
          , Css.File.compile
                [ common
                ]
          )
        ]


common : Css.Stylesheet
common =
    stylesheet
        [ body
            [ backgroundColor (rgb 70 75 80)
            ]
        ]
