using IronPython.Hosting;
using 

namespace Helpers
{
    public class PythonScripting
    {
     
        public static void run(string handle)
        {
            ScriptEngine engine = Python.CreateEngine();
            engine.ExecuteFile(@"test.py");
        }
    }
}
