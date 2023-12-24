using MySql.Data.MySqlClient;

namespace EVRAZ
{
    public class DBTable
    {
        public List<Dictionary<string, object?>> rows = [];
        public bool IsError;

        public object?[] Select(string column)
        {
            List<object?> r = [];
            foreach (Dictionary<string, object?> row in rows)
            {
                r.Add(row[column]);
            }
            return [.. r];
        }
    }

    public struct Query
    {
        public string query;
        public object[]? parameters;
    }

    public class DBConnection
    {
        public required string Server { get; set; }
        public required string DatabaseName { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }

        private MySqlConnection? Connection { get; set; }

        private Queue<Query> Queries = new();

        public static DBConnection? Self { get; private set; }
        public DBConnection()
        {
            Self ??= this;
        }

        public DBTable Query(string query, object[]? parameters = null)
        {
            Queries.Enqueue(new Query() { query = query, parameters = parameters });

        }

        public DBTable QueueQuery(string query, object[]? parameters = null)
        {
            Connect();
            Thread.Sleep(250);
            try
            {
                List<Dictionary<string, object?>> rows = [];

                using (MySqlCommand cmd = new(query, Connection!))
                {
                    if (parameters != null)
                    {
                        for (int i = 0; i < parameters.Length; i++)
                        {
                            cmd.Parameters.AddWithValue("@" + i.ToString(), parameters[i]);
                        }
                    }

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, object?> columns = new();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                if (reader.IsDBNull(i))
                                    columns[reader.GetName(i)] = null;
                                else
                                    columns[reader.GetName(i)] = reader.GetValue(i);
                            }
                            rows.Add(columns);
                        }
                    }
                }
                Close();
                return new DBTable() { rows = rows };
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new DBTable() { IsError = true, rows = { new (){ { "error", ex.Message } } } };
            }
        }

        public bool Connect()
        {
            try
            {
                if (Connection == null || Connection.State != System.Data.ConnectionState.Open)
                {
                    if (string.IsNullOrEmpty(DatabaseName))
                        return false;

                    string connstring = string.Format("Server={0}; database={1}; UID={2}; password={3};",
                        Server, DatabaseName, Username, Password);

                    //LINUX
                    //string connstring = string.Format("Server={0}; database={1}; UID={2}; password={3}; protocol=Unix",
                    //	Server, DatabaseName, Username, Password);

                    Connection = new MySqlConnection(connstring);
                    Connection.Open();
                    return true;
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Close()
        {
            Connection!.Close();
        }
    }
}
