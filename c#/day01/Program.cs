using System.IO;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;

internal class Program
{
    private static void Main(string[] args)
    {
        var filename = "input.txt";
        var sum = 0;

        try
        {
            using StreamReader reader = new(filename);
            string input = reader.ReadToEnd();
            string[] lines = input
                .Split(new string[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)
                .Select(line => line.Trim())
                .ToArray();

            string digit = @"[0-9]|one|two|three|four|five|six|seven|eight|nine";
            string backwardsDigit = @"[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin";

            foreach (string line in lines)
            {
                string reversedLine = new string(line.Reverse().ToArray());

                // match the first occurance of a numeric digit using a
                // regular expression
                Match match = Regex.Match(line, $"{digit}");

                // match the last occurance of a numeric digit using a 
                // regular expression
                Match lastMatch = Regex.Match(reversedLine, $"{backwardsDigit}");

                // if a match is found, print the value of the match
                if (match.Success && lastMatch.Success)
                {
                    var first = Replace(match.Value);
                    var last = Replace(lastMatch.Value);

                    Console.WriteLine($"First: {first}, Last: {last}");

                    sum += int.Parse($"{first}{last}");
                }
                
            }

            Console.WriteLine($"Sum of first and last digit of each line: {sum}");

        }
        catch (IOException e)
        {
            Console.WriteLine($"Could not open file {filename}");
        }
    }

    private static string Replace(string value)
    {
        return value switch
        {
            "one" => "1",
            "eno" => "1",
            "two" => "2",
            "owt" => "2",
            "three" => "3",
            "eerht" => "3",
            "four" => "4",
            "ruof" => "4",
            "five" => "5",
            "evif" => "5",
            "six" => "6",
            "xis" => "6",
            "seven" => "7",
            "neves" => "7",
            "eight" => "8",
            "thgie" => "8",
            "nine" => "9",
            "enin" => "9",
            _ => value
        };
    }   

}