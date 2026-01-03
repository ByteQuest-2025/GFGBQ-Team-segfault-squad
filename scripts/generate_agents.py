from datetime import datetime
import os
import random

os.makedirs("agents", exist_ok=True)

now = datetime.utcnow().isoformat()
agent_id = random.randint(1000, 9999)

filename = f"agents/multi_agent_{agent_id}.py"

content = f'''"""
Auto-generated Multi-Agent Example
Generated at {now} UTC
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

    task = "Build an autonomous system"
    plan = planner.plan(task)
    result = executor.execute(plan)

    print(result)
'''

with open(filename, "w") as f:
    f.write(content)

print(f"Generated {filename}")
