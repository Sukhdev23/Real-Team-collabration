+---------------------+           +--------------------------+
|    React Frontend   |  <----->  |   Express.js Backend     |
|                     |  REST     |   (API + Socket.IO)      |
| - Boards UI         |           |                          |
| - Tasks Drag & Drop |           |                          |
| - Chat Thread       |  <----->  | - /api/tasks             |
| - Filters           |  WebSocket| - /api/boards            |
+---------------------+           +-----------+--------------+
                                              |
             Real-time Updates via            |
             Socket.IO (task/chat updates)    |
                                              v
                        +------------------------------+
                        |      MongoDB (Atlas)         |
                        | - Users                      |
                        | - Boards                     |
                        | - Tasks (with chat)          |
                        +------------------------------+
