namespace Test_Backend.Entity
{
    public class Users
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string ProfilePicture { get; set; } = string.Empty;
    }
}
