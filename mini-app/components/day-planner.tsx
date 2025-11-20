"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function DayPlanner() {
  const [tasks, setTasks] = useState<string>("");
  const [plan, setPlan] = useState<string[]>([]);

  const handlePlan = () => {
    const taskList = tasks
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    // Simple example: just list tasks with a time slot
    const now = new Date();
    const hours = 9; // start at 9 AM
    const newPlan = taskList.map((task, idx) => {
      const start = new Date(now);
      start.setHours(hours + idx);
      const end = new Date(start);
      end.setHours(start.getHours() + 1);
      return `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}: ${task}`;
    });
    setPlan(newPlan);
  };

  return (
    <Card className="w-full max-w-2xl mt-6">
      <CardHeader>
        <CardTitle>Plan Your Day</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          placeholder="Enter tasks separated by commas"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <Button onClick={handlePlan}>Generate Plan</Button>
        {plan.length > 0 && (
          <ul className="list-disc pl-5">
            {plan.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
