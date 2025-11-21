namespace TaskApi.Dtos
{
    public class TaskDto
    {
        public string Title { get; set; }
        public DateTime? DueDate { get; set; }
        public string Status { get; set; }
    }
}
