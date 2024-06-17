import time
import threading


class Path:
    def __init__(self, color, priority=0):
        self.color = color
        self.last_used = 0
        self.vehicle = ""
        self.box_count = 0
        self.priority = priority


class TransportDaemon:
    def __init__(self, num_paths):
        self.paths = {i: Path("Unknown") for i in range(1, num_paths + 1)}
        self.lock = threading.Lock()

    def request_path(self, path_id, box_color, vehicle, priority=0):
        with self.lock:
            if path_id not in self.paths:
                return "Invalid path"

            path = self.paths[path_id]
            current_time = time.time()

            # Prioritize based on time and priority
            if (current_time - path.last_used < 45 * 60 and path.vehicle != vehicle) or \
               (current_time - path.last_used >= 45 * 60 and path.priority < priority):
                path.color = box_color
                path.last_used = current_time
                path.vehicle = vehicle
                path.box_count += 1
                return "Path accepted"

            return "Path rejected: recently used with different vehicle or lower priority"

    def print_paths(self):
        for path_id, path in self.paths.items():
            print(
                f"Path {path_id}: {path.color}, used at {path.last_used:.2f}, "
                f"by {path.vehicle}, box count: {path.box_count}, priority: {path.priority}"
            )


class MangoAgent:
    def __init__(self, daemon):
        self.daemon = daemon

    def request_path(self, path_id, box_color, vehicle, priority=0):
        response = self.daemon.request_path(path_id, box_color, vehicle, priority)
        print(
            f"Agent requested path {path_id} with color {box_color} using vehicle {vehicle} "
            f"(priority: {priority}): {response}"
        )


if __name__ == "__main__":
    daemon = TransportDaemon(1000)
    agent = MangoAgent(daemon)

    # Simulating requests with priority
    agent.request_path(1, "Red", "Vehicle1")
    agent.request_path(1, "Blue", "Vehicle1", priority=1)  # Higher priority overrides time
    agent.request_path(2, "Green", "Vehicle2")
    daemon.print_paths()