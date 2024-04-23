"use strict";

var _require = require('../model/dbPool'),
    getConnection = _require.getConnection,
    runQueryValues = _require.runQueryValues,
    allCommunitiesSyntax = _require.allCommunitiesSyntax; // Endpoint to fetch all communities


function allCommunities(req, res) {
  var connection, result;
  return regeneratorRuntime.async(function allCommunities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getConnection());

        case 2:
          connection = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(runQueryValues(connection, allCommunitiesSyntax));

        case 6:
          result = _context.sent;

          if (result) {
            res.status(200).json({
              message: result
            });
          } else {
            res.status(500).json({
              error: 'error occured'
            });
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('Error joining community:', _context.t0);
          res.status(500).json({
            error: 'An error occurred while fetching the communities.'
          });

        case 14:
          _context.prev = 14;
          connection.release();
          return _context.finish(14);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10, 14, 17]]);
}

module.exports = {
  allCommunities: allCommunities
};