"""
Auto-generated Multi-Agent Example
Generated at 2026-02-17T01:23:13.764893 UTC
"""

class Agent:
    def __init__(self, name):
        self.name = name

    def act(self, message):
        return f"{self.name} received: {message}"


class PlannerAgent(Agent):
    def plan(self, task):
        return f"Planning steps for: {task}"


class ExecutorAgent(Agent):
    def execute(self, plan):
        return f"Executing plan: {plan}"


if __name__ == "__main__":
    planner = PlannerAgent("Planner")
    executor = ExecutorAgent("Executor")

    task = "Build an autonomous system"
    plan = planner.plan(task)
    result = executor.execute(plan)

    print(result)
