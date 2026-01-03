TEST_MODE = True


from datetime import datetime, timezone, timedelta
import os
import random

# IST timezone
IST = timezone(timedelta(hours=5, minutes=30))
now = datetime.now(IST)

# Run only between 1 AM and 9 AM IST
if not TEST_MODE and not (1 <= now.hour <= 9):
    print("Outside night window. Exiting.")
    exit(0)

# Create output folder
os.makedirs("agents", exist_ok=True)

agent_id = random.randint(1000, 9999)
filename = f"agents/multi_agent_{agent_id}.py"

content = f'''"""
Auto-generated Multi-Agent Example
Generated at {now.isoformat()}
"""

class Agent:
    def __init__(self, name):
        self.name = name

    def act(self, message):
        return f"{{self.name}} received: {{message}}"


class PlannerAgent(Agent):
    def plan(self, task):
        return f"Planning steps for: {{task}}"


class ExecutorAgent(Agent):
    def execute(self, plan):
        return f"Executing plan: {{plan}}"


if __name__ == "__main__":
    planner = PlannerAgent("Planner")
    executor = ExecutorAgent("Executor")

    task = "Build an AI system"
    plan = planner.plan(task)
    result = executor.execute(plan)

    print(result)
'''

with open(filename, "w") as f:
    f.write(content)

print(f"Generated {filename}")
