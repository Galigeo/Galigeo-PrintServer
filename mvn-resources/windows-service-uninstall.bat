set "CURRENT_DIR=%cd%"
set node_path=%CURRENT_DIR%\node
echo path to node is %node_path%
call %node_path%\node -v
call %node_path%\node windows-service-uninstall.js
