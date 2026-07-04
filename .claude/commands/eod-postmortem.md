Run the EOD postmortem manually. Follow the instructions in `journal/SELF_IMPROVE.md` (MODE: EOD POSTMORTEM).

Steps:
1. Read today's `journal/postmortem_YYYY-MM-DD.md` (use today's date)
2. If no postmortem file exists for today, inform the user "No predictions were logged today — nothing to review."
3. Otherwise, execute all EOD steps from SELF_IMPROVE.md:
   - Write EOD summary to the postmortem file
   - Extract learnings to `journal/daily_learning.json` (only if meaningful)
   - Run graduation (scan last 90 entries, semantic grouping, 3+ occurrences → append to `journal/learnings.md`)
   - Cleanup postmortem files older than 5 days
4. Report results to the user
