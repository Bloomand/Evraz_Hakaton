using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using System.Globalization;
using System.Xml.Linq;

namespace EVRAZ.Controllers
{
    public struct RequestTotalArgs
    {
        public int StationId { get; set; }
    }


    [ApiController]
    public class WebController : Controller
    {
        [HttpPost]
        [Route("/total_station")]
        public DBTable RequestTotal(RequestTotalArgs args)
        {
            return DBConnection.Self!.Query("SELECT * FROM station_extra_plane WHERE StationId = @0", [args.StationId]);
        }

        [HttpPost]
        [Route("/auth")]
        public ResponseAuth RequestAuth(RequestAuthArgs args)
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT * FROM user WHERE login = @0 AND password = @1",
                [args.Login, args.Password]
            );

            if (query.IsError || query.rows.Count == 0)
            {
                return new ResponseAuth() { Id = -1, Role = UserRole.Operator };
            }

            return new ResponseAuth()
            {
                Id = (int)(query.rows[0]["id"] ?? -1),
                Role = (UserRole)(query.rows[0]["role"] ?? UserRole.Operator)
            };
        }

        [HttpPost]
        [Route("/admin_stations")]
        public ResponseAdminStations RequestAdminStations()
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT * FROM station"
            );

            if (query.IsError)
                return new ResponseAdminStations() { Stations = [] };

            List<StationInfo> stations = [];
            foreach (Dictionary<string, object?> station in query.rows)
            {
                stations.Add(new StationInfo() { Id = (int)(station["id"] ?? -1), Name = (string)(station["name"] ?? "") });
            }
            return new ResponseAdminStations() { Stations = stations };
        }

        [HttpPost]
        [Route("/station_parks")]
        public ResponseStationParks RequestStationParks(RequestStationParksArgs args)
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT * FROM park_stations WHERE park_stations.stationID = @0",
                [args.StationId]
            );

            if (query.IsError)
            {
                return new ResponseStationParks() { ParkIds = [] };
            }

            List<int> ids = [];
            foreach (Dictionary<string, object?> park in query.rows)
            {
                ids.Add((int)(park["parkID"] ?? -1));
            }

            return new ResponseStationParks() { ParkIds =  ids };
        }

        [HttpPost]
        [Route("/park")]
        public ResponsePark RequestPark(RequestParkArgs args)
        {
            DBTable parkQuery = DBConnection.Self!.Query(
                "SELECT * FROM park WHERE id = @0",
                [args.ParkId]
            );

            if (parkQuery.IsError || parkQuery.rows.Count == 0)
            {
                return new ResponsePark() { Name = "ERROR", Paths = [] };
            }

            string name = (string)(parkQuery.rows[0]["name"] ?? "");

            DBTable pathsQuery = DBConnection.Self!.Query(
                "SELECT * FROM path WHERE ParkId = @0",
                [args.ParkId]
            );

            if (pathsQuery.IsError || pathsQuery.rows.Count == 0)
            {
                return new ResponsePark() { Name = name, Paths = [] };
            }

            List<int> ids = [];
            foreach (Dictionary<string, object?> path in pathsQuery.rows)
            {
                ids.Add((int)(path["id"] ?? -1));
            }

            return new ResponsePark() { Name = name, Paths = ids };
        }

        [HttpPost]
        [Route("/path_objects")]
        public ResponsePathObjects RequestPathObjects(RequestPathOnjectsArgs args)
        {
            DBTable wagonQuery = DBConnection.Self!.Query(
                "SELECT * FROM path_wagon WHERE PathId = @0",
                [args.PathId]
            );

            List<PathObject> objects = [];
            if (!wagonQuery.IsError && wagonQuery.rows.Count > 0)
            {
                foreach (Dictionary<string, object?> wagon in wagonQuery.rows)
                {
                    objects.Add(new PathObject()
                    {
                        Id = (int)(wagon["WagonId"] ?? -1),
                        Type = PathObjectType.Wagon
                    });
                }
            }

            DBTable locomotiveQuery = DBConnection.Self!.Query(
                "SELECT * FROM path_locomotive WHERE PathId = @0",
                [args.PathId]
            );

            if (!locomotiveQuery.IsError && locomotiveQuery.rows.Count > 0)
            {
                foreach (Dictionary<string, object?> locomotive in locomotiveQuery.rows)
                {
                    objects.Add(new PathObject() {
                        Id = (int)(locomotive["LocomotiveId"] ?? -1),
                        Type = PathObjectType.Locomotive
                    });
                }
            }

            return new ResponsePathObjects() { Objects = objects };
        }

        [HttpPost]
        [Route("/wagon")]
        public ResponseWagon RequestWagon(RequestWagonArgs args)
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT * FROM wagon_plain WHERE Id = @0",
                [args.WagonId]
            );

            if (query.IsError || query.rows.Count == 0)
                return new ResponseWagon() { CargoType = "", MaxCapacity = 0, Owner = "", Position = 0, Type = "" };

            return new ResponseWagon()
            {
                Type = (string)(query.rows[0]["Type"] ?? ""),
                Owner = (string)(query.rows[0]["Owner"] ?? ""),
                IsSick = (bool)Convert.ToBoolean(query.rows[0]["IsSick"] ?? true),
                IsEmpty = (bool)Convert.ToBoolean(query.rows[0]["IsEmpty"] ?? false),
                Position = (int)(query.rows[0]["Position"] ?? -1),
                CargoType = (string)(query.rows[0]["Material"] ?? ""),
                CargoOperation = (CargoOperationTypes)(query.rows[0]["CargoOperation"] ?? CargoOperationTypes.None),
                Operation = (string)(query.rows[0]["Operation"] ?? ""),
                MaxCapacity = (float)(query.rows[0]["MaxCapacity"] ?? 0f),
                CurrentCargoAmount = (float)(query.rows[0]["CurrentCargoAmount"] ?? 0f)
            };
        } 

        [HttpPost]
        [Route("/locomotive")]
        public ResponseLocomotive RequestLocomotive(RequestLocomotiveArgs args)
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT * FROM locomotive_plain WHERE Id = @0",
                [args.LocomotiveId]
            );

            if (query.IsError || query.rows.Count == 0)
                return new ResponseLocomotive() { Position = -1, Driver = "", Operation = "" };

            return new ResponseLocomotive()
            {
                Position = (int)(query.rows[0]["Position"] ?? -1),
                Driver = (string)(query.rows[0]["Driver"] ?? ""),
                Operation = (string)(query.rows[0]["Operation"] ?? "")
            };
        }

        [HttpPost]
        [Route("/user_station")]
        public ResponseUserStation RequestUserStation(RequestUserStationArgs args)
        {
            DBTable query = DBConnection.Self!.Query(
                "SELECT user.station as 'station', station.name as 'name' FROM user LEFT JOIN station ON station.Id = user.station WHERE user.id = @0",
                [args.UserId]
            );

            if (query.IsError || query.rows.Count == 0)
                return new ResponseUserStation() { Station = new StationInfo() { Id = -1, Name = ""} };

            return new ResponseUserStation() { Station = new StationInfo() {
                    Id = (int)(query.rows[0]["station"] ?? -1),
                    Name = (string)(query.rows[0]["name"] ?? "")
                }
            };
        }
    }

    public enum UserRole
    {
        Admin,
        Operator
    }

    public enum CargoOperationTypes
    {
        None,
        In,
        Out
    }

    public enum PathObjectType
    {
        Wagon,
        Locomotive
    }

    public class PathObject
    { 
        public int Id { get; set; }
        public PathObjectType Type { get; set; }
    }

    public class StationInfo
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }

    public class RequestAuthArgs
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
    }

    public class ResponseAuth
    {
        public int Id { get; set; }
        public UserRole Role { get; set; }
    }

    public class RequestAdminStationsArgs
    {

    }

    public class ResponseAdminStations
    {
        public required List<StationInfo> Stations { get; set; }
    }

    public class RequestUserStationArgs
    {
        public int UserId { get; set; }
    }
    
    public class ResponseUserStation
    {
        public required StationInfo Station { get; set; }
    }

    public class RequestStationParksArgs
    {
        public int StationId { get; set; }
    }

    public class ResponseStationParks
    {
        public required List<int> ParkIds { get; set; }
    }

    public class RequestParkArgs
    {
        public int ParkId { get; set; }
    }

    public class ResponsePark
    {
        public required string Name { get; set; }
        public required List<int> Paths { get; set; }
    }

    public class RequestPathOnjectsArgs
    {
        public int PathId { get; set; }
    }

    public class ResponsePathObjects
    {
        public required List<PathObject> Objects { get; set; }
    }

    public class RequestWagonArgs
    {
        public int WagonId { get; set; }
    }

    public class ResponseWagon
    {
        public required string Type { get; set; }
        public required string Owner { get; set; }
        public bool IsSick { get; set; } = false;
        public bool IsEmpty { get; set; } = true;
        public required int Position { get; set; }
        public required string CargoType { get; set; }
        public CargoOperationTypes CargoOperation { get; set; } = CargoOperationTypes.None;
        public string Operation { get; set; } = "";
        public required float MaxCapacity { get; set; }
        public float CurrentCargoAmount { get; set; } = 0;
    }

    public class RequestLocomotiveArgs
    {
        public int LocomotiveId { get; set; }
    }

    public class ResponseLocomotive
    {
        public required int Position { get; set; }
        public required string Driver { get; set; }
        public string Operation { get; set; } = "";
    }

}
