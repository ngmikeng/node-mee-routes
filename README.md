node-mee-routes
===
- Server: node, socket.io
- Client: vue 2
- RESTful API.
- Realtime Web App.
- Google Maps API.

### Requirements
###### App 1: Request Receiver
- Manage request info from customer: name, phone, pickup address, note...

###### App 2: Location Identifier
- Identify customer's coordinate (geocode), using `geocoding`.
- User can move customer's position on map and customer's address will be corresponding updated to show on UI, using `reverse geocoding`.
- Customer's address use to send to drivers is the address is recorded from App 1 (not address from reverse geocode).

###### App 3: Request Management (Request Map View)
- Showing list requests and their corresponding status (no identified, indentified, driver picked up, moving, finished...).
- Sort list desc by created time.
- In case request have been picked up or accepted by a driver, user can view the shortest path from driver to customer, and show dirver info on map also.

###### App 4: Driver App (Mobile UI)
- Driver can click on map to updating coordinate, inform an error if the new coordinate over 100m (Harversine).
- Login to system and wait for a request (sending from server).
- Driver has status Online / Offline / Busy.
- If there is a request, app show its info in 10 seconds and wait for driver Accept or Decline.
- App show the shortest path from driver to customer on map.
- Driver select `begin` when they picked up customer, and `finish` when done.
- After done a request, driver's status will be changed to Online.

###### Server:
- System only find available drivers for customer, not find busy drivers (moving, offline).
- The priority to find a driver for a request is belong to the path from driver to customer is shortest (harversine).
- System only retry find N times for a request (param N can config on server). If enought N times, but there is no driver then request will be recorded as `no dirver`.
- Using socket.io for handling reatime.
- All API have to setup JWT access-token and refresh-token.